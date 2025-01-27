package com.music.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.annotation.PreDestroy;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;

import com.music.model.*;
import com.music.repository.AlbumRepository;
import com.music.repository.MusicRepository;
import com.music.repository.RoleRepository;
import com.music.repository.SeederStatusRepository;
import com.music.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

	private final RoleRepository roleRepository;
	private final UserRepository userRepository;
	private final AlbumRepository albumRepository;
	private final MusicRepository musicRepository;
	private final SeederStatusRepository seederStatusRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	private final MongoTemplate mongoTemplate;

	public void seedDatabase(int max) {
		String seederName = "dataSeeder";

		SeederStatus status = seederStatusRepository.findByName(seederName)
				.orElse(SeederStatus.builder().name(seederName).completed(false).build());

		if (status.isCompleted()) {
			log.info("Database already seeded. Skipping...");
			return;
		}

		Faker faker = new Faker(new Locale("en-US"));

		Role role1 = Role.builder().name("ROLE_ADMIN").build();
		Role role2 = Role.builder().name("ROLE_USER").build();
		roleRepository.saveAll(Arrays.asList(role1, role2));

		Instant startInstant = Instant.now();
		Role adminRole = roleRepository.findByName("ROLE_ADMIN")
				.orElseThrow(() -> new RuntimeException("Admin role not found"));
		// Role userRole = roleRepository.findByName("ROLE_USER")
		// .orElseThrow(() -> new RuntimeException("User role not found"));

		User adminUser = User.builder().email("admin@youcode.ma")
				.username("admin")
				.password(passwordEncoder.encode("password"))
				.roles(Arrays.asList(adminRole))
				.build();

		userRepository.save(adminUser);

		// List<Album> albums = IntStream.range(0, max).mapToObj(i -> Album.builder()
		// .title(faker.lorem().word())
		// .artist(faker.name().fullName())
		// .year(faker.number().numberBetween(2000, 2024))
		// .build()).collect(Collectors.toList());
		// albumRepository.saveAll(albums);

		// CompletableFuture<Void> usersFuture = CompletableFuture.runAsync(() -> {
		// log.info("Seeding users started...");

		// Role adminRole = roleRepository.findByName("ROLE_ADMIN")
		// .orElseThrow(() -> new RuntimeException("Admin role not found"));
		// Role userRole = roleRepository.findByName("ROLE_USER")
		// .orElseThrow(() -> new RuntimeException("User role not found"));

		// List<User> users = IntStream.range(0, max).parallel() // Parallel stream to
		// reduce time taken in
		// // hashing the passwords
		// .mapToObj(i -> User.builder()
		// .email(faker.internet().emailAddress())
		// .username(faker.name().username())
		// .password(passwordEncoder.encode("password")) // Expensive
		// // operation
		// .roles(i == 0 ? Arrays.asList(adminRole) : Arrays.asList(userRole)) // First
		// user is admin
		// .build())
		// .collect(Collectors.toList());
		// userRepository.saveAll(users);

		// log.info("Seeding users completed");
		// });

		// CompletableFuture<Void> musicsFuture = CompletableFuture.runAsync(() -> {
		// log.info("Seeding musics started...");
		// Random random = new Random();
		// List<Music> musics = IntStream.range(0, max)
		// .mapToObj(i -> Music.builder()
		// .title(faker.lorem().word())
		// .duration(faker.number().numberBetween(90, 500))
		// .album(albums.get(random.nextInt(albums.size())))
		// .build())
		// .collect(Collectors.toList());
		// musicRepository.saveAll(musics);

		// log.info("Seeding musics completed");
		// });

		// CompletableFuture.allOf(usersFuture, musicsFuture).join(); // Ensures both
		// tasks are completed

		long timeTaken = (Instant.now().toEpochMilli() - startInstant.toEpochMilli()) / 1000;

		status.setCompleted(true);
		status.setLastRun(LocalDateTime.now());
		seederStatusRepository.save(status);

		log.info("Seeding complete : time taken " + timeTaken + " s");

	}

	// @PreDestroy
	// public void cleanup() {
	// mongoTemplate.dropCollection(Music.class);
	// mongoTemplate.dropCollection(Album.class);
	// mongoTemplate.dropCollection(User.class);
	// mongoTemplate.dropCollection(Role.class);
	// mongoTemplate.dropCollection(Role.class);
	// mongoTemplate.dropCollection("fs.files");
	// mongoTemplate.dropCollection("fs.chunks");
	// }

}
