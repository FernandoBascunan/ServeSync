package servesync.Inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import servesync.Inventario.config.TenantContext;
import servesync.Inventario.entity.OrdenCompra;
import servesync.Inventario.repository.OrdenCompraRepository;

import java.util.List;

@Service
public class OrdenCompraService {
    @Autowired
    private OrdenCompraRepository ordenCompraRepository;

    public void ingresar(OrdenCompra ordenCompra) {
        ordenCompraRepository.save(ordenCompra);
    }
    public List<OrdenCompra> Ordenes(Long empresaId){
        //Long empresaId = TenantContext.getCurrentTenant();
        return ordenCompraRepository.findByEmpresaID(empresaId);
    }

}
