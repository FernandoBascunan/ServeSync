package servesync.Inventario.service;

import org.springframework.stereotype.Service;
import servesync.Inventario.dto.DetalleVentaResponseDTO;
import servesync.Inventario.dto.VentaResponseDTO;
import servesync.Inventario.entity.Venta;

import java.util.stream.Collectors;

// La clase VentaMapper actúa como un convertidor de entidades a DTOs dentro del microservicio de inventario de ServeSync.
// Su método toDTO transforma una entidad Venta en un VentaResponseDTO, incluyendo sus detalles (DetalleVentaResponseDTO)
// para devolver información estructurada y lista para el frontend.

@Service
public class VentaMapper {

    public VentaResponseDTO toDTO(Venta venta) {
        VentaResponseDTO dto = new VentaResponseDTO();
        dto.setId(venta.getId());
        dto.setFechaVenta(venta.getFechaVenta());
        dto.setEmpresaID(venta.getEmpresaID());
        dto.setNombreCliente(venta.getNombreCliente());
        dto.setActivo(venta.getActiva());

        dto.setDetalles(
                venta.getDetalles().stream().map(detalle -> {
                    return new DetalleVentaResponseDTO(
                            detalle.getId(),
                            detalle.getCantidad(),
                            detalle.getProducto().getId(),
                            detalle.getProducto().getNombre(),
                            detalle.getPrecioUnitario()
                    );
                }).collect(Collectors.toList())
        );

        return dto;
    }
}
