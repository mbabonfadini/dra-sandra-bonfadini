import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin/login pages
    if (location.pathname.startsWith("/admin") || location.pathname === "/login") return;

    supabase.from("page_views").insert({ page_path: location.pathname }).then(() => {});
  }, [location.pathname]);
}
