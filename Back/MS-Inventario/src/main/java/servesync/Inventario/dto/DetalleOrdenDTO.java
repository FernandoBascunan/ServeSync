package servesync.Inventario.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetalleOrdenDTO {
    private Long productoId;
    private int cantidad;
    private double precioUnitario;
}
