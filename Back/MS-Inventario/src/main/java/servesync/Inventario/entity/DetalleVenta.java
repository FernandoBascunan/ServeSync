package servesync.Inventario.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// La clase DetalleVenta representa la entidad JPA que modela el detalle de cada venta en el microservicio de inventario.
// Establece relaciones muchos a uno con las entidades Venta y Producto, indicando que cada detalle pertenece a una venta y a un producto específicos.
// Usa @JsonBackReference para evitar recursividad infinita al serializar las relaciones bidireccionales en JSON


@Entity
@Table(name="detalle_venta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int cantidad;
    private double precioUnitario;

    @ManyToOne
    @JoinColumn(name = "venta_id", nullable = false)
    @JsonBackReference
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;



}
