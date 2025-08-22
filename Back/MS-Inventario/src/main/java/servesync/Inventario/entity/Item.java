package servesync.Inventario.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Item")
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String categoria;
    private String unidadMedida;
    private Integer stockActual;
    private Integer stockMinimo;
    private BigDecimal precioUnitario;
    private BigDecimal costoUnitario;
    private LocalDate fechaVencimiento;
    private String fotoUrl;

    @Enumerated(EnumType.STRING)
    private EstadoProducto estado = EstadoProducto.DISPONIBLE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    public enum EstadoProducto {
        DISPONIBLE, AGOTADO, VENCIDO
    }
}