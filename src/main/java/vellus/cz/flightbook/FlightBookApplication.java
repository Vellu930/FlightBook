package vellus.cz.flightbook;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import vellus.cz.flightbook.data.Destination;
import vellus.cz.flightbook.data.DestinationRepo;

import java.util.stream.Stream;

@SpringBootApplication
public class FlightBookApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlightBookApplication.class, args);
	}

	@Bean
	CommandLineRunner init(DestinationRepo repo) {
		return args -> {
			Stream.of("Paris", "Rome", "Malaga", "London", "Singapore").forEach(name -> {
				Destination dest = new Destination();
				dest.setId((long) (Math.random() * 150000));
				dest.setName(name);
				repo.save(dest);
			});
			repo.findAll().forEach(System.out::println);
		};
	}

}
