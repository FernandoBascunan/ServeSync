package servesync.Inventario.config;


public class TenantContext {
    private static final ThreadLocal<Long> currentTenant = new ThreadLocal<>();

    public static void setCurrentTenant(Long empresaId) {
        currentTenant.set(empresaId);
    }

    public static Long getCurrentTenant() {
        return currentTenant.get();
    }

    public static void clear() {
        currentTenant.remove();
    }
}