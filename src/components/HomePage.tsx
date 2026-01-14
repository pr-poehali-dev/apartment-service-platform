import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Master {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  price: string;
  avatar: string;
  description: string;
  phone: string;
  email: string;
}

interface Category {
  name: string;
  icon: string;
  count: number;
}

interface HomePageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: Category[];
  masters: Master[];
  favorites: number[];
  toggleFavorite: (masterId: number) => void;
}

const HomePage = ({ searchQuery, setSearchQuery, categories, masters, favorites, toggleFavorite }: HomePageProps) => {
  return (
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
  );
};

export default HomePage;
