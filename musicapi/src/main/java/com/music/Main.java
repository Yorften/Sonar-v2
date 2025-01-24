package com.music;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.music.util.DataSeeder;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner init(DataSeeder dataSeeder) {
        return args -> {
            dataSeeder.seedDatabase(10); // Seed 10 records in each table
        };
    }
}