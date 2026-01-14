import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface MastersListPageProps {
  view: 'ads' | 'masters';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredMasters: Master[];
  favorites: number[];
  toggleFavorite: (masterId: number) => void;
}

const MastersListPage = ({ view, searchQuery, setSearchQuery, filteredMasters, favorites, toggleFavorite }: MastersListPageProps) => {
  if (view === 'ads') {
    return (
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
    );
  }

  return (
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
  );
};

export default MastersListPage;
