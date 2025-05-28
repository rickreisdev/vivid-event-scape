
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, LogOut, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onLoginClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors">
            <Calendar className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EventManager
            </span>
          </Link>

          <div className="flex items-center space-x-4">
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
                  <span>{user.email}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={onLogout}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
