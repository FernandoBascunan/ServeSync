package servesync.Inventario.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "empresas")
@Data
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String rut;
}