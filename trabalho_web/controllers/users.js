const bcrypt = require('bcrypt');

module.exports = {
  index: (req, res) => {
    res.render('index', { user: req.session.user }); 
  },
  login: (req, res) => {
    res.render('login', { error: null });
  },
  authenticate: (User, bcrypt) => {
    return async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ where: { email } });
        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            req.session.user = {
              id: user.id,
              name: user.name,
            };
            res.redirect('/');
          } else {
            res.render('login', { error: 'Senha incorreta.' });
          }
        } else {
          res.render('login', { error: 'Usuário não encontrado.' });
        }
      } catch (err) {
        console.error(err);
        res.render('login', { error: 'Erro ao fazer login.' });
      }
    };
  },
  register: (req, res) => {
    res.render('register', { error: null });
  },
  createUser: (User, bcrypt) => {
    return async (req, res) => {
      const { name, email, password } = req.body;
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
          name,
          email,
          password: hashedPassword,
        });
        res.redirect('/login');
      } catch (err) {
        console.error(err);
        res.render('register', { error: 'Erro ao cadastrar usuário.' });
      }
    };
  },
  userProfile: (req, res) => {
    if (req.session.user) {
      res.render('user-profile', { user: req.session.user, error: null }); // Passa 'user' e 'error'
    } else {
      res.redirect('/login');
    }
  },
  editProfile: (req, res) => {
    if (req.session.user) {
      res.render('edit-profile', { user: req.session.user, error: null }); // Passa 'user' e 'error'
    } else {
      res.redirect('/login');
    }
  },
  updateProfile: (User, bcrypt) => {
    return async (req, res) => {
      const { name, email, password } = req.body;
      try {
        const user = await User.findByPk(req.session.user.id);
        if (user) {
          if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
          }
          user.name = name;
          user.email = email;
          await user.save();
          req.session.user.name = name;
          res.redirect('/user-profile');
        } else {
          res.render('edit-profile', { error: 'Usuário não encontrado.' });
        }
      } catch (err) {
        console.error(err);
        res.render('edit-profile', { error: 'Erro ao atualizar perfil.' });
      }
    };
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect('/login');
    });
  },
};