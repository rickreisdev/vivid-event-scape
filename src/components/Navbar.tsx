import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Plus, LogOut, User, LogIn, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            EventosBR
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                <Calendar className="h-4 w-4 mr-2" />
                Eventos
              </Button>
            </Link>

            {user ? (
              <>
                <Link to="/novo-evento">
                  <Button className="event-gradient text-white hover:opacity-90 transition-opacity">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Evento
                  </Button>
                </Link>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="max-w-32 truncate">{profile?.name || 'Usuário'}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={signOut}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <Button 
                onClick={onLoginClick}
                className="event-gradient text-white hover:opacity-90 transition-opacity"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Eventos
                  </Link>
                </DropdownMenuItem>
                
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/novo-evento" className="flex items-center w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Evento
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem disabled>
                      <User className="h-4 w-4 mr-2" />
                      <span className="truncate">{profile?.name || 'Usuário'}</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={signOut} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={onLoginClick}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
