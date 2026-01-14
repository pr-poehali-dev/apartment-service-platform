import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
}

const Header = ({ activeTab, setActiveTab, favoritesCount }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Wrench" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-secondary">РемонтМастер</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button 
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('home')}
            >
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button 
              variant={activeTab === 'ads' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('ads')}
            >
              <Icon name="Briefcase" size={18} className="mr-2" />
              Объявления
            </Button>
            <Button 
              variant={activeTab === 'masters' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('masters')}
            >
              <Icon name="Users" size={18} className="mr-2" />
              Мастера
            </Button>
            <Button 
              variant={activeTab === 'favorites' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('favorites')}
              className="relative"
            >
              <Icon name="Heart" size={18} className="mr-2" />
              Избранное
              {favoritesCount > 0 && (
                <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0">
                  {favoritesCount}
                </Badge>
              )}
            </Button>
          </nav>
          <Button>
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
