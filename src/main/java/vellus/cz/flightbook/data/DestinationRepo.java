package vellus.cz.flightbook.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DestinationRepo extends JpaRepository<Destination, Long> {
}
