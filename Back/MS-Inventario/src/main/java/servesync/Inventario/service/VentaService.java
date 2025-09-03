package servesync.Inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import servesync.Inventario.config.TenantContext;
import servesync.Inventario.dto.VentaDTO;
import servesync.Inventario.dto.VentaResponseDTO;
import servesync.Inventario.dto.detalleVentaDTO;
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
    public List<VentaResponseDTO> listar() {
        Long empresaId = TenantContext.getCurrentTenant();
        return ventaRepository.findByEmpresaID(empresaId)
                .stream()
                .map(ventaMapper::toDTO)
                .collect(Collectors.toList());
    }
    public VentaResponseDTO registrarVenta(VentaDTO ventaDTO) {
        //Long empresaId = TenantContext.getCurrentTenant();
        Venta venta = new Venta();
        venta.setFechaVenta(LocalDateTime.now());
        venta.setEmpresaID(ventaDTO.getEmpresaID());

        for(detalleVentaDTO detalleDTO : ventaDTO.getDetalles()){
            Producto producto = productoRepository.findById(detalleDTO.getProductoId())
                    .orElseThrow(() -> new RuntimeException(
                            "Producto no encontrado con ID: " + detalleDTO.getProductoId()
                    ));

            if (producto.getStockActual() < detalleDTO.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            DetalleVenta detalle=new DetalleVenta();
            detalle.setProducto(producto);
            detalle.setCantidad(detalleDTO.getCantidad());
            detalle.setPrecioUnitario(detalleDTO.getPrecioUnitario());
            detalle.setVenta(venta);
            venta.getDetalles().add(detalle);

            producto.setStockActual(producto.getStockActual() - detalleDTO.getCantidad());
            productoRepository.save(producto);
        }
        Venta guardada = ventaRepository.save(venta);
        return ventaMapper.toDTO(guardada);
    }

}
