package servesync.Mesas.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


// Representa la entidad de una mesa dentro del sistema.
// Está mapeada a la tabla mesa en la base de datos y define los atributos principales: id, capacidad, estado y la relación con una zona específica.

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
