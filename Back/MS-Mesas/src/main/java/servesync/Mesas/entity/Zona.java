package servesync.Mesas.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

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
    @JsonManagedReference   // 👈 Agrega esta línea
    private List<Mesa> mesas;
}
