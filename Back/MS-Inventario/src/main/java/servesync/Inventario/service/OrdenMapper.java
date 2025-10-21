package servesync.Inventario.service;

import org.springframework.stereotype.Service;
import servesync.Inventario.dto.DetalleOrdenResponseDTO;
import servesync.Inventario.dto.OrdenResponseDTO;
import servesync.Inventario.entity.OrdenCompra;

import java.util.stream.Collectors;

@Service

public class OrdenMapper {
    public OrdenResponseDTO toDTO(OrdenCompra ordenCompra) {
        OrdenResponseDTO dto = new OrdenResponseDTO();
        dto.setId(ordenCompra.getId());
        // Usa la fecha real desde la entidad (no la actual)
        dto.setFechaIngreso(ordenCompra.getFechaIngreso());
        // Asigna el proveedor real
        dto.setProveedor(ordenCompra.getProveedor());
        dto.setEmpresaId(ordenCompra.getEmpresaID());

        dto.setDetalleOrdenes(
                ordenCompra.getDetalles().stream()
                        .map(detalleOrden -> new DetalleOrdenResponseDTO(
                                detalleOrden.getId(),
                                detalleOrden.getCantidad(),
                                detalleOrden.getPrecioUnitario(),
                                detalleOrden.getProducto().getId(),
                                detalleOrden.getProducto().getNombre()
                        ))
                        .collect(Collectors.toList())
        );
        return dto;
    }
}