const research = [
  {
    id: "unifying-latent-space",
    title: "Unifying the Latent Space using AFCL and SimO2 Loss for Multimodal/Multilingual Tasks",
    author: "Taha Bouhsine",
    year: "2025",
    category: "Deep Learning",
    summary: "A novel approach to unify latent spaces across different modalities and languages using Anchor-Free Contrastive Learning (AFCL) and SimO2 Loss techniques.",
    details: "This research introduces a unified framework for embedding different data modalities (text, images, audio) and multiple languages into a shared latent space. By leveraging the SimO2 Loss function and AFCL principles, the model achieves superior alignment between modalities while preserving fine-grained semantic relationships. The approach demonstrates significant improvements on cross-modal and cross-lingual retrieval tasks.",
    status: "Independent Research",
    links: [
      {
        text: "Project Repository",
        url: "https://github.com/mlnomadpy/unifying-latent-space"
      },
      {
        text: "Preprint",
        url: "https://arxiv.org/"
      }
    ],
    tags: [
      "multimodal learning",
      "multilingual",
      "contrastive learning",
      "AFCL",
      "SimO2"
    ]
  },
  {
    id: "yatclr",
    title: "YatCLR: Simpler Framework for Fine-Grained Contrastive Learning of Visual Representations",
    author: "Taha Bouhsine",
    year: "2025",
    category: "Computer Vision",
    summary: "A simplified and more efficient framework for contrastive learning of visual representations that achieves state-of-the-art performance with reduced computational requirements.",
    details: "YatCLR (Yet Another Contrastive Learning Representation) introduces a streamlined approach to visual representation learning that eliminates many of the complexities found in existing frameworks. By focusing on essential components and optimizing the contrastive objective, YatCLR achieves superior performance on fine-grained visual tasks while requiring less computational resources and training time. This research demonstrates how simplification can lead to both better performance and efficiency in representation learning.",
    status: "Independent Research",
    links: [
      {
        text: "Project Page",
        url: "https://mlnomads.io/research/yatclr"
      }
    ],
    tags: [
      "contrastive learning",
      "computer vision",
      "representation learning",
      "deep learning"
    ]
  },
  {
    id: "many-hot-encoding",
    title: "Many-Hot Encoding",
    author: "Taha Bouhsine",
    year: "2025",
    category: "Machine Learning",
    summary: "A novel data encoding technique that extends one-hot encoding to efficiently represent complex categorical data with multiple overlapping attributes.",
    details: "This research introduces Many-Hot Encoding, a generalization of one-hot encoding that allows for the representation of entities with multiple overlapping attributes. The technique provides a more efficient and expressive way to encode complex categorical data while maintaining compatibility with existing machine learning models. Many-Hot Encoding shows significant improvements in model performance across various tasks involving multi-attribute data, such as recommendation systems, knowledge graphs, and hierarchical classification.",
    status: "Independent Research",
    links: [
      {
        text: "Technical Report",
        url: "https://mlnomads.io/research/many-hot-encoding"
      }
    ],
    tags: [
      "encoding",
      "categorical data",
      "representation",
      "feature engineering"
    ]
  },
  {
    id: "mind-cosmos",
    title: "Mind and Cosmos: Towards Cosmos-Inspired Activation-Free Deep Learning",
    author: "Taha Bouhsine",
    year: "2025",
    category: "Neural Networks",
    summary: "An exploration of activation-free neural networks inspired by cosmological principles, challenging the traditional neuron activation paradigm.",
    details: "This groundbreaking research draws parallels between cosmic structures and neural network architectures, proposing an entirely new class of activation-free neural networks. By replacing traditional activation functions with cosmos-inspired mathematical transformations, these networks achieve remarkable performance on complex tasks while exhibiting unique properties such as interpretability, robustness to adversarial attacks, and reduced computational requirements. The work represents a fundamental rethinking of neural network design principles.",
    status: "Independent Research",
    links: [
      {
        text: "Research Paper",
        url: "https://arxiv.org/"
      },
      {
        text: "Interactive Demo",
        url: "https://mind-cosmos.mlnomads.io"
      }
    ],
    tags: [
      "neural networks",
      "activation functions",
      "cosmology",
      "deep learning theory"
    ]
  },
  {
    id: "simo2",
    title: "SimO2: Cosmos-Inspired Anchor-Free Contrastive Loss",
    author: "Taha Bouhsine",
    year: "2025",
    category: "Deep Learning",
    summary: "A novel contrastive loss function inspired by cosmological principles that eliminates the need for anchors and achieves superior representation learning.",
    details: "SimO2 builds upon the foundation of SimO Loss by incorporating cosmological principles to create a more robust contrastive learning framework. This anchor-free approach allows for more natural representations of data relationships in the embedding space without relying on hard-coded anchoring points. Experimental results show that SimO2 consistently outperforms traditional contrastive losses across multiple domains including vision, language, and multimodal tasks. The loss function is particularly effective in scenarios with limited labeled data.",
    status: "Independent Research",
    links: [
      {
        text: "Paper",
        url: "https://arxiv.org/"
      },
      {
        text: "Implementation",
        url: "https://github.com/mlnomadpy/simo2"
      }
    ],
    tags: [
      "contrastive learning",
      "loss function",
      "representation learning"
    ]
  },
  {
    id: "dl-2-artificial-neurons",
    title: "Deep Learning 2.0: Artificial Neurons That Matter - Reject Correlation, Embrace Orthogonality",
    author: "Taha Bouhsine",
    year: "2025",
    category: "Neural Networks",
    summary: "A paradigm shift in neural network design that prioritizes orthogonality over correlation, leading to more robust and interpretable models.",
    details: "This research challenges the fundamental assumptions of traditional neural networks by proposing a new architecture that emphasizes orthogonality between neurons rather than correlation-based learning. By designing networks where neurons learn distinct, orthogonal features, the resulting models achieve greater interpretability, robustness to noise, and generalization capability. The paper introduces novel orthogonality constraints and training procedures that encourage neurons to specialize in complementary features, ultimately leading to what the author describes as 'Deep Learning 2.0' - a new generation of neural networks with dramatically improved properties.",
    status: "Independent Research",
    links: [
      {
        text: "Preprint",
        url: "https://arxiv.org/"
      }
    ],
    tags: [
      "orthogonality",
      "neural network design",
      "interpretability",
      "robust learning"
    ]
  },
  {
    id: "simo-loss",
    title: "SimO Loss: Anchor-Free Contrastive Loss for Fine-Grained Supervised Contrastive Learning",
    author: "Taha Bouhsine et al.",
    year: "2025",
    category: "Deep Learning",
    summary: "A novel contrastive loss function that eliminates anchors for more flexible and fine-grained representation learning in supervised settings.",
    details: "SimO Loss introduces an anchor-free approach to supervised contrastive learning that allows for more natural representation of semantic relationships. Unlike traditional contrastive losses that rely on manually defined positive and negative pairs, SimO Loss dynamically learns the optimal relationships between examples during training. This results in more nuanced embeddings that better capture the underlying structure of the data. The paper demonstrates state-of-the-art performance on multiple fine-grained classification benchmarks, and shows particular promise for domains with complex hierarchical relationships.",
    status: "Collaborative Research",
    links: [
      {
        text: "Paper",
        url: "https://arxiv.org/"
      },
      {
        text: "GitHub Repository",
        url: "https://github.com/mlnomadpy/simo-loss"
      }
    ],
    tags: [
      "contrastive learning",
      "loss function",
      "supervised learning",
      "fine-grained classification"
    ]
  },
  {
    id: "denomae",
    title: "DenoMAE: A Multimodal Autoencoder for Denoising Modulation Signals",
    author: "Atik Faysal, Taha Bouhsine, et al.",
    year: "2025",
    category: "Signal Processing",
    summary: "A multimodal autoencoder approach for effectively denoising modulation signals in challenging communication environments.",
    details: "DenoMAE extends the Masked Autoencoder (MAE) approach to signal processing by incorporating multiple modalities of signal information. This research addresses the critical challenge of signal denoising in wireless communications, particularly for modulation signals affected by various types of interference. By leveraging complementary information across different signal representations and domains, DenoMAE achieves superior denoising performance compared to traditional methods, especially in low SNR conditions. The architecture demonstrates robust performance across various modulation schemes and channel conditions, making it particularly valuable for applications in cognitive radio, satellite communications, and 5G/6G networks.",
    status: "Collaborative Research",
    links: [
      {
        text: "Publication",
        url: "https://ieeexplore.ieee.org/"
      }
    ],
    tags: [
      "signal processing",
      "autoencoders",
      "denoising",
      "multimodal learning",
      "wireless communications"
    ]
  }
];
export {
  research as default
};
