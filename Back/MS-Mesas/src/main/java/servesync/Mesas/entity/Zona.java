package servesync.Mesas.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

// Representa la entidad que agrupa las mesas dentro de una empresa.
// Está asociada a la tabla zona en la base de datos y contiene los campos principales: id, nombreZona y empresaId, que identifica a la empresa propietaria.
// Mediante la relación @OneToMany, una zona puede tener múltiples mesas,
// La anotación @JsonManagedReference permite manejar correctamente la serialización JSON evitando bucles con la entidad Mesa.

@Entity
@Table(name= "zona")
@Data
public class Zona{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombreZona;
    private Long empresaId;

    @OneToMany(mappedBy = "zona", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Mesa> mesas;
}
