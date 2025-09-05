import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import SearchResults from "@/pages/SearchResults";
import StudentLogin from "@/pages/StudentLogin";
import StudentDashboard from "@/pages/StudentDashboard";
import StudentHome from "@/pages/StudentHome";
import HostelDashboard from "@/pages/HostelDashboard";
import Fees from "@/pages/Fees";
import Payments from "@/pages/Payments";
import Rating from "@/pages/Rating";
import StudentHomeNew from "@/pages/Home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search-hostels" component={SearchResults} />
      <Route path="/student-login" component={StudentLogin} />
      <Route path="/student-dashboard" component={StudentDashboard} />
      <Route path="/student-home" component={StudentHome} />
      <Route path="/home" component={StudentHomeNew} />
      <Route path="/dashboard" component={HostelDashboard} />
      <Route path="/hostel-dashboard/:hostelId" component={HostelDashboard} />
      <Route path="/fees" component={() => <Fees standalone={false} />} />
      <Route path="/payments" component={() => <Payments standalone={false} />} />
      <Route path="/rating" component={Rating} />
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
