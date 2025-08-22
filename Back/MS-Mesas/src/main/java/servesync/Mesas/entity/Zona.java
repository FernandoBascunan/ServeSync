package servesync.Mesas.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Entity
@Table(name= "Zona")
@Data
public class Zona{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombreZona;

    @OneToMany(mappedBy = "Zona", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Mesa> mesas;
}
