import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!showOTP) {
        // Send verification email
        const response = await fetch(`http://localhost:8181/api/email/send-verification?email=${email}`, {
          method: 'POST'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to send verification email');
        }

        setShowOTP(true);
        toast({
          title: 'Verification Email Sent',
          description: 'Please check your email for the verification code.',
        });
      } else {
        // Verify OTP
        const verifyResponse = await fetch(`http://localhost:8181/api/email/verify-otp?email=${email}&otp=${otp}`, {
          method: 'POST'
        });

        const verifyData = await verifyResponse.json();

        if (!verifyResponse.ok) {
          throw new Error(verifyData.message || 'Invalid OTP');
        }

        // Register user after OTP verification
        const registerResponse = await fetch('http://localhost:8181/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            username: name, // Backend expects 'username' instead of 'name'
          }),
        });

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
          // Handle both string and object responses
          const errorMessage = typeof registerData === 'string' 
            ? registerData 
            : (registerData.message || 'Registration failed');
          throw new Error(errorMessage);
        }

        toast({
          title: 'Success',
          description: 'Registration successful! Redirecting to dashboard...',
        });

        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <User size={16} />
          </div>
          <Input
            id="name"
            placeholder="John Doe"
            required
            className="pl-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <Mail size={16} />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={showOTP}  // Disable email field once OTP is sent
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <Lock size={16} />
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Conditionally show OTP input after the email verification request */}
      {showOTP && (
        <div className="space-y-2">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : showOTP ? "Verify OTP" : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
