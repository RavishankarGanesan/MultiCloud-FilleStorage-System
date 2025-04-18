import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link } from "react-router-dom";
import { Cloud, CheckCircle, ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Cloud className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-semibold">CloudSync</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="container mx-auto py-16 px-4 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              One App for All Your Cloud Storage
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage files across Google Drive and OneDrive from a single, 
              unified interface. Simple, secure, and seamless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign in to your account
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card shadow-sm rounded-lg p-6 transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unified Access</h3>
                <p className="text-muted-foreground">
                  Access and manage files from multiple cloud providers in one place.
                </p>
              </div>
              
              <div className="bg-card shadow-sm rounded-lg p-6 transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="m18 16 4-4-4-4" />
                    <path d="m6 8-4 4 4 4" />
                    <path d="m14.5 4-5 16" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy File Transfer</h3>
                <p className="text-muted-foreground">
                  Move or copy files between Google Drive and OneDrive with ease.
                </p>
              </div>
              
              <div className="bg-card shadow-sm rounded-lg p-6 transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
                <p className="text-muted-foreground">
                  Your data remains secure with OAuth authentication and no stored credentials.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto py-16 px-4 bg-card rounded-lg my-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-semibold">Supported Cloud Services</h2>
              <p className="text-muted-foreground">
                MultiCloud currently supports the following cloud storage services, with more coming soon:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Google Drive</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Microsoft OneDrive</span>
                </li>
              </ul>
              
              <div className="pt-4">
                <Link to="/register">
                  <Button size="lg">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 md:order-last flex justify-center">
              <div className="w-full max-w-md relative">
                <div className="absolute top-4 left-4 rotate-[-6deg]">
                  <div className="w-64 h-40 bg-cloud-google/10 rounded-lg border border-cloud-google/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="64" height="64">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-20 right-4 rotate-[6deg]">
                  <div className="w-64 h-40 bg-cloud-onedrive/10 rounded-lg border border-cloud-onedrive/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="64" height="64">
                      <linearGradient id="k8yl7~hDat~FaoWq8WjN6a" x1="-1254.397" y1="887.1" x2="-1261.911" y2="882.839" gradientTransform="matrix(7.8769 0 0 -7.8769 9892.704 6990.47)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#0c59a4"/><stop offset="1" stopColor="#114a8b"/></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6a)" d="M25.01,8.565c-0.478-0.772-0.614-0.709-1.137-0.646c-0.59,0.071-1.439,0.321-2.191,0.662 c-1.55,0.697-2.503,1.85-2.749,2.153c-0.435,0.534-0.801,1.35-1.027,2.263c-0.129,0.519-0.233,1.295-0.185,2.089 c1.35,0.258,2.649-0.813,3.591-1.916c1.087-1.27,1.268-2.656,2.368-3.793C24.77,8.109,25.463,9.299,25.01,8.565z"/><linearGradient id="k8yl7~hDat~FaoWq8WjN6b" x1="-1252.05" y1="887.612" x2="-1254.712" y2="884.918" gradientTransform="matrix(7.8769 0 0 -7.8769 9892.704 6990.47)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1b9de2"/><stop offset=".16" stopColor="#1595df"/><stop offset=".67" stopColor="#0680d7"/><stop offset="1" stopColor="#0078d4"/></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6b)" d="M35.339,17.484c-0.608-0.259-1.092-0.204-1.857-0.066 c-1.143,0.207-2.334,1.272-2.935,1.897c-1.235,1.286-1.953,3.196-1.494,6.203c3.511-0.118,6.246-3.835,6.539-6.582 C35.671,17.91,35.635,17.607,35.339,17.484z"/><linearGradient id="k8yl7~hDat~FaoWq8WjN6c" x1="-1252.844" y1="872.202" x2="-1259.366" y2="878.966" gradientTransform="matrix(7.8769 0 0 -7.8769 9892.704 6990.47)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#28afea"/><stop offset="1" stopColor="#0b77e9"/></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6c)" d="M24.047,24.474c-3.595,0.552-6.182-1.851-7.54-3.658 c-0.231-0.309-0.536-0.886-0.835-1.497c-0.329-0.673-0.778-1.59-0.975-1.971c-0.497-0.964-1.084-1.943-1.352-3.061 c0.183-0.26,0.394-0.642,0.649-0.899c0.733-0.744,1.697-1.254,2.737-1.468c1.063-0.22,2.255-0.099,3.151,0.398 c0.295,0.164,0.759,0.469,1.246,0.938c0.523,0.504,1.025,1.161,1.389,1.648c1.223,0.177,2.316,0.871,3.108,1.882 c0.789,1.006,1.439,2.35,1.811,3.797c0.404,1.574,0.168,2.988,0.161,3.663C27.168,23.384,26.019,24.172,24.047,24.474z"/><linearGradient id="k8yl7~hDat~FaoWq8WjN6d" x1="-1254.431" y1="875.716" x2="-1257.336" y2="875.167" gradientTransform="matrix(7.8769 0 0 -7.8769 9892.704 6990.47)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#0f77e7"/><stop offset="1" stopColor="#0b5fba"/></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6d)" d="M24.047,24.474c-2.077,0.269-4.495,0.774-7.113-0.616 c-1.527,1.476-2.015,3.371-2.726,5.221c-0.376,0.98-1.692,1.878-2.684,2.365c-0.754,0.371-1.793,0.835-3.137,0.396 c-0.521-0.17-1.25-0.711-1.639-1.161c-0.451-0.521-0.706-1.377-0.742-1.552c-0.166-0.817-0.115-1.623,0.152-2.411 c0.169-0.5,0.483-1.067,0.771-1.519c1.692-2.708,4.02-4.994,6.471-6.678c0.292-0.201,0.527-0.362,0.647-0.51 c-0.202-0.252-0.373-0.611-0.671-1.225c-0.301-0.622-0.817-1.841-1.028-2.478c-0.32-0.961-0.254-2.683-0.249-3.161 c-1.858,0.651-3.587,1.815-5.053,3.161c-1.77,1.623-3.493,3.963-4.267,6.5c-0.188,0.617-0.644,2.102-0.673,3 c0,0.173-0.043,1.365,0.106,2.263c0.127,0.772,0.191,1.623,0.756,2.546c0.378,0.616,0.776,1.07,1.149,1.429 c0.75,0.724,1.614,1.207,2.507,1.59c1.035,0.444,2.236,0.572,3.392,0.336c1.028-0.209,1.86-0.743,2.539-1.338 c0.384-0.337,0.546-0.639,0.806-0.952c0.201-0.243,0.375-0.453,0.535-0.583c0.311-0.251,0.537-0.153,0.939-0.083 c0.847,0.144,1.658,0.35,2.188,0.466c0.996,0.216,3.738,0.93,4.356,2.233c0.241-0.09,0.536-0.2,0.784-0.353 c1.203-0.748,2.02-1.781,2.213-3.033c0.168-1.044-0.061-2.186-0.638-3.062c-0.502-0.76-1.229-1.346-2.1-1.686 C25.809,24.406,24.966,24.409,24.047,24.474z"/><linearGradient id="k8yl7~hDat~FaoWq8WjN6e" x1="-1252.438" y1="876.132" x2="-1248.088" y2="881.16" gradientTransform="matrix(7.8769 0 0 -7.8769 9892.704 6990.47)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1b9de2"/><stop offset=".16" stopColor="#1595df"/><stop offset=".67" stopColor="#0680d7"/><stop offset="1" stopColor="#0078d4"/></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6e)" d="M37.023,30.594c-1.234-1.289-2.092-3.031-2.56-5.158 c-0.033-0.151-0.088-0.322-0.132-0.514c-0.054-0.232-0.119-0.517-0.154-0.668c-0.18-0.772-0.383-1.564-0.723-2.244 c-0.869,0.51-1.631,1.303-2.246,2.156c-0.965,1.341-1.553,3.016-1.511,4.779c0.022,0.948,0.263,1.896,0.785,2.668 c0.312,0.462,0.732,0.848,1.208,1.093c0.982,0.504,2.12,0.337,3.05-0.108c0.555-0.266,1.017-0.617,1.529-1.018 C36.618,31.263,36.817,30.854,37.023,30.594z"/><linearGradient id="k8yl7~hDat~FaoWq8WjN6f" x1="-1260.002" y1="882.1" x2="-1253.792" y2="879.233" gradientTransform="matrix(7.8769 0 0 -7.8769 9892.704 6990.47)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#33aef1"/><stop offset=".33" stopColor="#0a9af1"/><stop offset=".66" stopColor="#0185eb"/><stop offset="1" stopColor="#0078d4"/></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6f)" d="M23.649,30.702c0.336,0.095,0.7,0.188,0.929,0.223 c0.893,0.138,2.208,0.177,3.463-0.1c1.566-0.343,3.224-1.108,4.982-3.034c-0.597-2.352-1.831-4.751-3.927-5.956 c-0.512-0.294-1.104-0.529-1.625-0.652c-0.426-0.1-0.77-0.139-1.335-0.061c0.206,3.936-1.114,5.75-2.585,6.862 C22.77,28.685,21.817,29.311,23.649,30.702z"/><linearGradient id="k8yl7~hDat~FaoWq8WjN6g" x1="-1258.541" y1="873.631" x2="-1249.775" y2="878.085" gradientTransform="matrix(7.8769 0 0 -7.8769 9892.704 6990.47)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#17afec"/><stop offset=".16" stopColor="#0fa3e8"/><stop offset=".67" stopColor="#0183d9"/><stop offset="1" stopColor="#0078d4"/></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6g)" d="M23.649,30.702c1.62,0.459,3.014,0.278,4.391,0.123 c1.22-0.137,3.14-0.504,4.675-1.793c0.364-0.308,0.731-0.64,1.144-1.124c0.467-0.544,0.918-1.235,1.284-1.963 c0.806-1.604,1.304-3.545,1.306-5.847c-0.008-1.342-0.148-2.907-0.565-4.309c-0.443-1.487-1.21-2.903-2.362-3.909 c-0.671-0.588-1.497-1.069-2.323-1.251c-0.834-0.185-1.679-0.084-2.445,0.24c-1.454,0.613-2.446,1.879-3.11,3.307 c-0.876,1.882-1.384,4.546-0.102,8.214c0.357,1.023,0.886,2.169,1.287,2.966c0.311,0.62,0.633,1.13,0.93,1.51 c-0.6-0.004-1.25-0.154-1.707-0.35c-0.673-0.289-1.161-0.651-1.564-1.008c-0.401-0.357-0.687-0.678-0.937-0.948 c-1.116-1.21-1.629-3.19-1.912-4.22c-0.328-1.198-0.463-2.514-0.35-3.764c0.105-1.166,0.326-2.346,0.828-3.396 c0.252-0.527,0.526-1.008,0.789-1.414c-1.351-0.247-2.72-0.159-3.965,0.337c-1.47,0.586-2.695,1.595-3.428,2.677 c-1.137,1.673-1.415,3.805-1.016,5.757c0.306,1.496,0.883,2.973,1.598,4.424c0.853,1.729,1.859,3.365,3.227,4.901 c1.765,1.98,3.949,3.674,6.504,4.512c2.552,0.839,5.466,0.942,8.094,0.115c0.428-0.136,0.842-0.264,1.251-0.49 c-0.187-0.115-0.354-0.242-0.523-0.378c-0.884-0.681-1.512-1.756-1.799-2.896c-0.293-1.177-0.207-2.415,0.14-3.59 c-0.354,0.244-0.715,0.454-1.085,0.629c-0.486,0.228-0.996,0.426-1.543,0.552c-1.111,0.256-2.335,0.196-3.497-0.102 C23.649,30.702,23.649,30.702,23.649,30.702z"/><linearGradient id="k8yl7~hDat~FaoWq8WjN6h" x1="-1257.72" y1="871.728" x2="-1257.72" y2="863.634" gradientTransform="matrix(7.8769 0 0 -7.8769 9892.704 6990.47)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1ac0f1"/><stop offset=".18" stopColor="#16b6ed"/><stop offset=".47" stopColor="#10a7e6"/><stop offset=".81" stopColor="#079fdf"/><stop offset="1" stopColor="#0078d4"/></linearGradient><path fill="url(#k8yl7~hDat~FaoWq8WjN6h)" d="M41.728,22.258c-0.326-2.777-1.506-5.473-3.533-7.547 c-1.925-1.969-4.585-3.387-7.489-3.842c-0.044,0.033-0.087,0.073-0.128,0.115c-0.274,0.283-0.45,1.003-0.516,1.177 c-0.302,0.796-0.487,1.635-0.619,2.541c-0.244,1.674-0.138,3.517,0.333,5.333c0.453,1.748,1.229,3.437,2.524,4.879 c1.175,1.312,2.819,2.373,4.807,2.382c0.96,0.004,1.923-0.263,2.733-0.749c0.791-0.474,1.468-1.145,1.93-1.976 c0.456-0.82,0.697-1.776,0.725-2.736C42.545,14.573,42.053,24.944,41.728,22.258z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="container mx-auto py-8 px-4 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Cloud className="h-5 w-5 text-primary mr-2" />
            <span className="font-medium">CloudSync</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CloudSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
