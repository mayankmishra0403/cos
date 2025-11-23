import React, { useState, useEffect } from 'react';
import { Download, Briefcase } from 'lucide-react';
import databaseService, { Material } from '../services/databaseService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Placement: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await databaseService.getPlacementMaterials();
      setMaterials(response.documents as unknown as Material[]);
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10 text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
            <Briefcase className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Placement Preparation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master Data Structures & Algorithms with company-specific questions and resources.
          </p>
        </div>

        {/* Placement Materials Section */}
        {materials.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Download className="text-primary" />
              Placement Resources
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materials.map((material) => (
                <Card key={material.$id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{material.title}</CardTitle>
                    <span className="inline-block mt-2 px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
                      {material.category}
                    </span>
                  </CardHeader>
                  <CardContent>
                    {material.description && (
                      <CardDescription className="mb-4">{material.description}</CardDescription>
                    )}
                    {material.fileUrl && (
                      <Button asChild className="w-full">
                        <a
                          href={material.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download size={18} className="mr-2" />
                          Download PDF
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Placement Resources Available</h3>
            <p className="text-muted-foreground">Placement preparation materials will be uploaded soon. Check back later!</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Placement;