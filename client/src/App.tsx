import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import SearchResults from "@/pages/SearchResults";
import StudentLogin from "@/pages/StudentLogin";
import StudentDashboard from "@/pages/StudentDashboard";
import HostelDashboard from "@/pages/HostelDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search-hostels" component={SearchResults} />
      <Route path="/student-login" component={StudentLogin} />
      <Route path="/student-dashboard" component={StudentDashboard} />
      <Route path="/hostel-dashboard/:hostelId" component={HostelDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
