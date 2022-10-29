package vellus.cz.flightbook.data;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Destination is an airport
 */
@Data
@Entity(name = "airports")
public class Destination {

    @Id
    private Long id;
    private String iata;
    private String name;

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
