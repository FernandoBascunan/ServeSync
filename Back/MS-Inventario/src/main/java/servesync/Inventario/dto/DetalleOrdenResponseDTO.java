package servesync.Inventario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetalleOrdenResponseDTO {
    private Long id;
    private int cantidad;
    private double precioUnitario;
    private Long idProducto;
    private String nombreProducto;
}
