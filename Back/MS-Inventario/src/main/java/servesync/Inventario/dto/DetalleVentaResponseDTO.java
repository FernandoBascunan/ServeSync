package servesync.Inventario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetalleVentaResponseDTO {
    private Long id;
    private int cantidad;
    private double precioUnitario;
    private Long productoId;
    private String productoNombre;
}