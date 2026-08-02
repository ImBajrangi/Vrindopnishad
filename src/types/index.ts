export interface ProjectItem {
  id: string;
  title: string;
  titleHindi?: string;
  category: string;
  description: string;
  descriptionHindi?: string;
  imageUrl: string;
  link: string;
  isExternal?: boolean;
  isFlagship?: boolean;
}

export interface DeveloperGuideProps {
  isOpen: boolean;
  onClose: () => void;
}
