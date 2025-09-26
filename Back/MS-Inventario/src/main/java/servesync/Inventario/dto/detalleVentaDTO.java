package servesync.Inventario.dto;

import lombok.Getter;
import lombok.Setter;
import servesync.Inventario.entity.Producto;

@Getter
@Setter
public class detalleVentaDTO {
    private int cantidad;
    private double precioUnitario;
    private Long idProducto;
}
