package servesync.Inventario.service;

import org.springframework.stereotype.Service;
import servesync.Inventario.dto.DetalleOrdenResponseDTO;
import servesync.Inventario.dto.OrdenResponseDTO;
import servesync.Inventario.entity.OrdenCompra;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class OrdenMapper {
    public OrdenResponseDTO toDTO(OrdenCompra ordenCompra) {
        OrdenResponseDTO dto = new OrdenResponseDTO();
        dto.setId(ordenCompra.getId());
        dto.setFechaIngreso(LocalDateTime.now());
        dto.setEmpresaId(ordenCompra.getEmpresaID());
        dto.setDetalleOrdenes(
                ordenCompra.getDetalles().stream().map(detalleOrden -> {
                    return new DetalleOrdenResponseDTO(
                            detalleOrden.getId(),
                            detalleOrden.getCantidad(),
                            detalleOrden.getPrecioUnitario(),
                            detalleOrden.getProducto().getId(),
                            detalleOrden.getProducto().getNombre()
                    );

                }).collect(Collectors.toList()));
        return dto;
    }
}
