package servesync.Inventario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VentaResponseDTO {
    private Long id;
    private LocalDateTime fechaVenta;
    private Long empresaID;
    private String nombreCliente;
    private Boolean activo;
    private List<DetalleVentaResponseDTO> detalles;
}
