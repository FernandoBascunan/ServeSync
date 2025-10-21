package servesync.Inventario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdenResponseDTO {
    private Long id;
    private LocalDate fechaIngreso;
    private String proveedor;
    private Long empresaId;
    private List<DetalleOrdenResponseDTO> detalleOrdenes;
}
