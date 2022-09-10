package vellus.cz.flightbook.data;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Destination is usually a city or place, real or imagined, that can be travelled to...
 */
@Data
@Entity
public class Destination {

    @Id
    private Long id;
    private String name;

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
