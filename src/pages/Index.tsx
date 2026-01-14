import { useState } from 'react';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import MastersListPage from '@/components/MastersListPage';
import FavoritesPage from '@/components/FavoritesPage';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Электрика', icon: 'Zap', count: 45 },
    { name: 'Сантехника', icon: 'Droplet', count: 38 },
    { name: 'Отделка', icon: 'PaintBucket', count: 62 },
    { name: 'Строительство', icon: 'HardHat', count: 28 },
    { name: 'Дизайн', icon: 'Palette', count: 34 },
    { name: 'Мебель', icon: 'Sofa', count: 19 }
  ];

  const masters = [
    {
      id: 1,
      name: 'Алексей Петров',
      specialty: 'Электрик',
      rating: 4.9,
      reviews: 127,
      experience: '12 лет',
      price: 'от 1500 ₽/час',
      avatar: '',
      description: 'Профессиональный электромонтаж, замена проводки, установка автоматов',
      phone: '+7 (912) 345-67-89',
      email: 'alex.petrov@mail.ru'
    },
    {
      id: 2,
      name: 'Марина Соколова',
      specialty: 'Дизайнер интерьера',
      rating: 5.0,
      reviews: 89,
      experience: '8 лет',
      price: 'от 3000 ₽/час',
      avatar: '',
      description: '3D визуализация, планировка, подбор материалов и мебели',
      phone: '+7 (905) 234-56-78',
      email: 'marina.design@mail.ru'
    },
    {
      id: 3,
      name: 'Дмитрий Иванов',
      specialty: 'Сантехник',
      rating: 4.8,
      reviews: 156,
      experience: '15 лет',
      price: 'от 1200 ₽/час',
      avatar: '',
      description: 'Установка сантехники, замена труб, монтаж систем отопления',
      phone: '+7 (913) 456-78-90',
      email: 'dmitry.santech@mail.ru'
    },
    {
      id: 4,
      name: 'Ольга Кузнецова',
      specialty: 'Отделка стен',
      rating: 4.9,
      reviews: 94,
      experience: '10 лет',
      price: 'от 800 ₽/м²',
      avatar: '',
      description: 'Покраска, поклейка обоев, декоративная штукатурка',
      phone: '+7 (902) 567-89-01',
      email: 'olga.otdelka@mail.ru'
    }
  ];

  const toggleFavorite = (masterId: number) => {
    setFavorites(prev => 
      prev.includes(masterId) 
        ? prev.filter(id => id !== masterId)
        : [...prev, masterId]
    );
  };

  const filteredMasters = masters.filter(master =>
    master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    master.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteMasters = masters.filter(master => favorites.includes(master.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        favoritesCount={favorites.length} 
      />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <HomePage 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={categories}
            masters={masters}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'ads' && (
          <MastersListPage 
            view="ads"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredMasters={filteredMasters}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'masters' && (
          <MastersListPage 
            view="masters"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredMasters={filteredMasters}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesPage 
            favoriteMasters={favoriteMasters}
            toggleFavorite={toggleFavorite}
          />
        )}
      </main>

      <footer className="bg-secondary text-white mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Wrench" size={28} className="text-primary" />
                <h3 className="text-xl font-bold">РемонтМастер</h3>
              </div>
              <p className="text-sm text-gray-300">
                Платформа для поиска проверенных мастеров по ремонту и строительству
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Категории</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Электрика</li>
                <li>Сантехника</li>
                <li>Отделка</li>
                <li>Строительство</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>О нас</li>
                <li>Контакты</li>
                <li>Помощь</li>
                <li>Блог</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@remontmaster.ru</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm text-gray-400">
            © 2026 РемонтМастер. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
