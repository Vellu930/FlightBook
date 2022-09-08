package vellus.cz.flightbook.data;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Data
@Entity
public class Destination {

    @Id
    private Long destinationId;
    private String name;

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
