package servesync.Inventario.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// La clase Venta representa la entidad JPA que modela una venta en el microservicio de inventario de ServeSync.
// Contiene información clave como la fecha, cliente, empresa asociada y estado (activa o finalizada).
// Establece una relación uno a muchos con DetalleVenta, permitiendo registrar los productos vendidos en cada transacción.
// El uso de @JsonManagedReference gestiona la serialización JSON junto a @JsonBackReference en DetalleVenta, evitando bucles infinitos al convertir los datos a JSON.

@Entity
@Table(name="venta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fechaVenta;
    private String nombreCliente;

    @Column(name="empresaID",nullable = false)
    private Long empresaID;

    @Column(nullable = false)
    private Boolean activa = true;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetalleVenta> detalles = new ArrayList<>();


}
