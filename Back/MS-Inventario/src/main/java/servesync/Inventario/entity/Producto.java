package servesync.Inventario.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

// La clase Producto define la entidad JPA que representa un producto dentro del sistema de inventario de ServeSync.
// Incluye atributos esenciales como nombre, stock, precio, categoría y empresa asociada, con validaciones de obligatoriedad y longitud.
// Mantiene una relación uno a muchos con DetalleVenta, lo que permite registrar las ventas relacionadas con cada producto.
// El uso de Lombok simplifica la implementación al generar automáticamente los constructores, getters y setters.

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

    @OneToMany(mappedBy = "producto",cascade = CascadeType.ALL)

    private List<DetalleVenta> ventas=new ArrayList<>();





}
