package servesync.Inventario.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="producto")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String nombre;
    @Column(nullable = false)
    private int stockActual;
    @Column(nullable = false)
    private Double precio;
    private String categoria;
    @Column(nullable = false,name = "empresaID")
    private Long empresaID;

    @OneToMany(mappedBy = "producto",cascade = CascadeType.ALL,orphanRemoval = true)

    private List<DetalleVenta> ventas=new ArrayList<>();

    @OneToMany(mappedBy = "producto",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleOrden> detallesOrden = new ArrayList<>();



}
