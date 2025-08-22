package servesync.Inventario.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ordenes_compra")
@Data
public class OrdenCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String proveedor;

    private LocalDateTime fechaEmision;

    private LocalDate fechaEntrega;

    private BigDecimal total;

    @Enumerated(EnumType.STRING)
    private EstadoOrden estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @OneToMany(mappedBy = "ordenCompra", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleOrden> detalles = new ArrayList<>();

    public enum EstadoOrden {
        PENDIENTE, RECIBIDA, CANCELADA
    }
}