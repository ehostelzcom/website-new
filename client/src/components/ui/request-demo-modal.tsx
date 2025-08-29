import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const requestDemoSchema = z.object({
  homeName: z.string().min(2, "Home name must be at least 2 characters"),
  type: z.enum(["Boys", "Girls"], { required_error: "Please select hostel type" }),
  mobile: z.string().min(11, "Please enter a valid mobile number"),
  province: z.string().min(1, "Please select a province"),
  city: z.string().min(1, "Please select a city"),
  location: z.string().min(1, "Please enter location"),
  address: z.string().min(10, "Please provide complete address")
});

type RequestDemoForm = z.infer<typeof requestDemoSchema>;

interface RequestDemoModalProps {
  children: React.ReactNode;
}

export default function RequestDemoModal({ children }: RequestDemoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const provinces = [
    "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", 
    "Gilgit-Baltistan", "Azad Jammu and Kashmir"
  ];
  
  const cities = {
    "Punjab": ["Lahore", "Karachi", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala"],
    "Sindh": ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah"],
    "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Abbottabad", "Kohat", "Bannu"],
    "Balochistan": ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Sibi"],
    "Gilgit-Baltistan": ["Gilgit", "Skardu", "Hunza", "Ghanche"],
    "Azad Jammu and Kashmir": ["Muzaffarabad", "Mirpur", "Kotli", "Rawalakot"]
  };

  const form = useForm<RequestDemoForm>({
    resolver: zodResolver(requestDemoSchema),
    defaultValues: {
      homeName: "",
      type: undefined,
      mobile: "",
      province: "",
      city: "",
      location: "",
      address: ""
    }
  });

  const selectedProvince = form.watch("province");
  const availableCities = selectedProvince ? cities[selectedProvince as keyof typeof cities] || [] : [];

  const onSubmit = async (data: RequestDemoForm) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual demo request submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Demo Request Submitted!",
        description: "Thank you for your interest. Our team will contact you within 24 hours to schedule your personalized demo.",
      });
      
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit demo request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request Demo</DialogTitle>
          <DialogDescription>
            Tell us about your hostel and we'll schedule a personalized demo showing how EHostelz can transform your operations.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="homeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Al-Noor Boys Hostel"
                        data-testid="input-home-name"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Boys">Boys</SelectItem>
                        <SelectItem value="Girls">Girls</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+92 300 1234567"
                      data-testid="input-mobile"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("city", ""); // Reset city when province changes
                      }} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-demo-province">
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={!selectedProvince}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-demo-city">
                          <SelectValue placeholder={!selectedProvince ? "Select province first" : "Select city"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., DHA Phase 2, Near University"
                      data-testid="input-location"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complete Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide the complete address of your hostel..."
                      className="min-h-[80px]"
                      data-testid="input-address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                data-testid="button-submit-demo"
              >
                {isSubmitting ? "Submitting..." : "Request Demo"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}