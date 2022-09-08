package vellus.cz.flightbook.web;

import org.springframework.web.bind.annotation.*;
import vellus.cz.flightbook.data.Destination;
import vellus.cz.flightbook.data.DestinationRepo;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DestinationController {

    private DestinationRepo repo;
    public DestinationController(DestinationRepo repo) {
        this.repo = repo;
    }

    @GetMapping("/destinations")
    public List<Destination> getDestinations() {
        return repo.findAll().stream().toList();
    }

    @PostMapping("/newDestination")
    public void addDestination(@RequestBody Destination dest) {
        repo.save(dest);
    }
}
