package vellus.cz.flightbook.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import vellus.cz.flightbook.data.Destination;
import vellus.cz.flightbook.data.DestinationRepo;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DestinationController {

    private final DestinationRepo repo;
    public DestinationController(DestinationRepo repo) {
        this.repo = repo;
    }

    @GetMapping("/destinations")
    public List<Destination> getDestinations() {
        return repo.findAll().stream().toList();
    }

    @PostMapping("/newDestination")
    public void addDestination(@RequestBody Destination dest) {
        log.info("destination being saved to server: {}, with id: {} ", dest.getName(), dest.getId());
        repo.save(dest);
    }
}
