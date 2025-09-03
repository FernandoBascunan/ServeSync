package servesync.Inventario.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter

public class OrdenCompraDTO {
    private Long empresaId;
    private String proveedor;
    private List<DetalleOrdenDTO> detalles;
}
