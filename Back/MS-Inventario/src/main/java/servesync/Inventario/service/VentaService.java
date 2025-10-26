package servesync.Inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import servesync.Inventario.dto.*;
import servesync.Inventario.entity.DetalleVenta;
import servesync.Inventario.entity.Producto;
import servesync.Inventario.entity.Venta;
import servesync.Inventario.repository.ProductoRepository;
import servesync.Inventario.repository.VentaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class VentaService {
    @Autowired
    private VentaRepository ventaRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private VentaMapper ventaMapper;
    public List<VentaResponseDTO> listar(Long empresaId) {
        return ventaRepository.findByEmpresaID(empresaId)
                .stream()
                .map(ventaMapper::toDTO)
                .collect(Collectors.toList());
    }
    public VentaResponseDTO registrarVenta(VentaDTO ventaDTO) {
        Venta venta = new Venta();
        venta.setFechaVenta(LocalDateTime.now());
        venta.setEmpresaID(ventaDTO.getEmpresaID());
        venta.setNombreCliente(ventaDTO.getNombreCliente());

        for(detalleVentaDTO detalleDTO : ventaDTO.getDetalles()) {
            Producto producto = productoRepository.findById(detalleDTO.getIdProducto())
                    .orElseThrow(() -> new RuntimeException(
                            "Producto no encontrado con ID: " + detalleDTO.getIdProducto()
                    ));

            if (producto.getStockActual() < detalleDTO.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            DetalleVenta detalle = new DetalleVenta();
            detalle.setProducto(producto);
            detalle.setCantidad(detalleDTO.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setVenta(venta);
            venta.getDetalles().add(detalle);

            producto.setStockActual(producto.getStockActual() - detalleDTO.getCantidad());
            productoRepository.save(producto);
        }

        Venta guardada = ventaRepository.save(venta);
        return ventaMapper.toDTO(guardada);
    }


    public List<VentaCantidadDTO> getVentasByEmpresaAndProducto(Long empresaID, Long productoID) {
        List<Venta> ventas = ventaRepository.findDistinctByEmpresaIDAndDetalles_Producto_Id(empresaID, productoID);

        // Mapear solo fecha y cantidad vendida del producto filtrado
        return ventas.stream()
                .flatMap(v -> v.getDetalles().stream()
                        .filter(d -> d.getProducto().getId().equals(productoID))
                        .map(d -> new VentaCantidadDTO(
                                v.getFechaVenta(),
                                d.getCantidad()
                        ))
                ).collect(Collectors.toList());
    }
}
