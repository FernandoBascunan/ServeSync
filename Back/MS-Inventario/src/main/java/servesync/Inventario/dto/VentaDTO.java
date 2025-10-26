package servesync.Inventario.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class VentaDTO {
    private Long empresaID;
    private String nombreCliente;
    private List<detalleVentaDTO> detalles;
}
