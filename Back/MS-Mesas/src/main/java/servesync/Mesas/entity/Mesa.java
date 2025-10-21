package servesync.Mesas.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "mesa")
@Data
public class Mesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int capacidad;
    private String status;

    @ManyToOne
    @JoinColumn(name = "zona_id")
    @JsonBackReference
    private Zona zona;
}
