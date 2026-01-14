import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
                {favorites.length > 0 && (
                  <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0">
                    {favorites.length}
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

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <section className="text-center py-12 animate-fade-in">
              <h2 className="text-5xl font-bold text-secondary mb-4">
                Найдите проверенных мастеров
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Более 200 профессионалов готовы помочь с ремонтом
              </p>
              <div className="max-w-2xl mx-auto flex gap-3">
                <Input 
                  placeholder="Поиск по специальности или имени..." 
                  className="text-lg h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button size="lg" className="h-12 px-8">
                  <Icon name="Search" size={20} />
                </Button>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-secondary mb-6">Категории услуг</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                  <Card 
                    key={index}
                    className="hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
                  >
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon name={category.icon} size={24} className="text-primary" />
                      </div>
                      <h4 className="font-semibold mb-1">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.count} мастеров</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-secondary mb-6">Популярные мастера</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {masters.slice(0, 4).map((master) => (
                  <Card key={master.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={master.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                            {master.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFavorite(master.id)}
                        >
                          <Icon 
                            name="Heart" 
                            size={20}
                            className={favorites.includes(master.id) ? 'fill-red-500 text-red-500' : ''}
                          />
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{master.name}</CardTitle>
                      <CardDescription>{master.specialty}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{master.rating}</span>
                        <span className="text-sm text-muted-foreground">({master.reviews} отзывов)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span>Опыт: {master.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Icon name="Wallet" size={16} />
                        <span>{master.price}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Icon name="Phone" size={16} className="mr-2" />
                        Связаться
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-secondary">Все объявления</h2>
              <Button>
                <Icon name="Plus" size={18} className="mr-2" />
                Разместить объявление
              </Button>
            </div>
            <div className="flex gap-3">
              <Input 
                placeholder="Поиск объявлений..." 
                className="max-w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMasters.map((master) => (
                <Card key={master.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={master.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {master.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{master.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">{master.specialty}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{master.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold">{master.rating}</span>
                        <span className="text-sm text-muted-foreground">({master.reviews})</span>
                      </div>
                      <div className="text-sm font-semibold text-primary">{master.price}</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">Подробнее</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'masters' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-secondary">Каталог мастеров</h2>
            <div className="flex gap-3">
              <Input 
                placeholder="Поиск мастеров..." 
                className="max-w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid gap-6">
              {filteredMasters.map((master) => (
                <Card key={master.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={master.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                          {master.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-2xl">{master.name}</CardTitle>
                            <CardDescription className="text-base">{master.specialty}</CardDescription>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleFavorite(master.id)}
                          >
                            <Icon 
                              name="Heart" 
                              size={24}
                              className={favorites.includes(master.id) ? 'fill-red-500 text-red-500' : ''}
                            />
                          </Button>
                        </div>
                        <div className="flex gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{master.rating}</span>
                            <span className="text-sm text-muted-foreground">({master.reviews} отзывов)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Clock" size={18} className="text-muted-foreground" />
                            <span className="text-sm">Опыт: {master.experience}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{master.description}</p>
                    <div className="flex gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Phone" size={16} className="text-primary" />
                          <span>{master.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Mail" size={16} className="text-primary" />
                          <span>{master.email}</span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-xl font-bold text-primary">{master.price}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    <Button className="flex-1">
                      <Icon name="Phone" size={18} className="mr-2" />
                      Позвонить
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="Mail" size={18} className="mr-2" />
                      Написать
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-secondary">Избранные мастера</h2>
            {favoriteMasters.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground mb-2">Нет избранных мастеров</p>
                <p className="text-muted-foreground">Добавьте мастеров в избранное, чтобы быстро находить их</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteMasters.map((master) => (
                  <Card key={master.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={master.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                            {master.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFavorite(master.id)}
                        >
                          <Icon 
                            name="Heart" 
                            size={20}
                            className="fill-red-500 text-red-500"
                          />
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{master.name}</CardTitle>
                      <CardDescription>{master.specialty}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{master.rating}</span>
                        <span className="text-sm text-muted-foreground">({master.reviews} отзывов)</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Phone" size={14} className="text-muted-foreground" />
                          <span>{master.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Mail" size={14} className="text-muted-foreground" />
                          <span>{master.email}</span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-primary">{master.price}</div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Icon name="Phone" size={16} className="mr-2" />
                        Связаться
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
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
