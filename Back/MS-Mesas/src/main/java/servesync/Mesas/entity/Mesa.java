package servesync.Mesas.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="mesa")
@Data
public class Mesa {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private int capacidad;
    private Boolean status= true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zona_id", nullable = false)
    private Zona zona;


}
